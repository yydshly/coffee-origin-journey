import {mechanismContent} from './mechanisms.js';
import {cues,chapters,cueAt,chapterAt,timeLabel,inspectionValue,narrationAt} from './timeline.js?v=10';
import {createNarrator} from './narrator.js?v=10';
const $=id=>document.getElementById(id),video=$('film');
let total=cues.at(-1).end,started=false,firstPlay=true,lastCue=null,lastNarration=null,scrubbing=false,seekTarget=null,buffering=false,disposing=false,playRequest=0,wantsPlayback=false;
video.controls=false;
for(const track of video.textTracks||[])track.mode='disabled';
const isPlaying=()=>!video.paused&&!video.ended&&!video.seeking&&!video.error&&!buffering&&!scrubbing&&!disposing&&!$('detail-dialog').open;
const narrator=createNarrator({synth:window.speechSynthesis,Utterance:window.SpeechSynthesisUtterance,isPlaying,getCue:()=>narrationAt(video.currentTime),getTime:()=>video.currentTime,getPlaybackRate:()=>video.playbackRate||1,onStatus:s=>{
 $('voice').disabled=!s.available;$('voice').setAttribute('aria-pressed',String(s.enabled));$('voice').textContent='中文解说：'+(s.enabled?'开':'关');
 $('voice-status').textContent=s.error?'设备语音播放失败，继续显示字幕':s.available?(s.waiting?'字幕保留，下一句继续解说':'设备中文音色 · 完整短句，句间留白'):s.supported?'本设备暂无可用中文音色，继续显示字幕':'本浏览器不支持设备语音，继续显示字幕';
}});
function status(message,error=false){$('load-status').hidden=!message;$('load-message').textContent=message;$('retry').hidden=!error;}
function update(){
 const time=video.currentTime||0,cue=cueAt(time),chapter=chapterAt(time);if(!scrubbing)$('scrub').value=time;
 $('time').textContent=timeLabel(time)+' / '+timeLabel(total);$('scrub').setAttribute('aria-valuetext',timeLabel(time)+'，'+cue.label);
 $('play').textContent=video.ended?'再看一遍':video.paused?'播放':'暂停';$('big-play').hidden=started||!video.paused;
 $('inspect').textContent=video.paused?'看这一步细节':'暂停看细节';
 $('action-label').textContent=cue.label;$('material-label').textContent=cue.material;
 if(lastCue!==cue){const explanation=mechanismContent(cue.mechanism||cue.stage);$('mechanism-title').textContent='这一步怎样发生：'+explanation.title;$('mechanism-body').innerHTML=explanation.html;lastCue=cue;}
 const narration=narrationAt(time);if(lastNarration!==narration){lastNarration=narration;$('subtitle').textContent=narration.text;narrator.speak(narration);}
 for(const b of $('chapters').children){if(b.dataset.stage===chapter[0])b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');}
}
async function play(){
 const request=++playRequest;wantsPlayback=true;
 if(video.ended)seek(0);started=true;if(firstPlay){firstPlay=false;if(narrator.discover())narrator.setEnabled(true);}narrator.discover();
 try{await video.play();if(request!==playRequest){if(!wantsPlayback)video.pause();return;}status('');update();}catch{if(request===playRequest&&wantsPlayback)status('浏览器暂未开始播放，请再点击播放。',true);}
}
function pause(){wantsPlayback=false;playRequest++;video.pause();narrator.cancel();update();}
function seek(time){narrator.cancel();lastCue=null;lastNarration=null;seekTarget=Math.max(0,Math.min(total,time));if(video.readyState>=1){video.currentTime=seekTarget;seekTarget=null;}update();}
function toggle(){video.paused?play():pause();}
chapters.forEach(([stage,label,time],i)=>{const button=document.createElement('button');button.dataset.stage=stage;button.innerHTML='<span>'+String(i+1).padStart(2,'0')+'</span>'+label;button.onclick=()=>seek(time);$('chapters').append(button);});
$('mechanism-details').addEventListener('toggle',()=>{if($('mechanism-details').open)pause();});
$('big-play').onclick=play;$('play').onclick=toggle;
$('replay').onclick=()=>{narrator.cancel();seek(0);play();};
$('scrub').addEventListener('input',()=>{scrubbing=true;seek(Number($('scrub').value));});
$('scrub').addEventListener('change',()=>{scrubbing=false;update();if(isPlaying())narrator.speak(narrationAt(video.currentTime));});
$('voice').onclick=()=>{firstPlay=false;narrator.setEnabled(!narrator.enabled);};
$('speed').onchange=()=>{video.playbackRate=Number($('speed').value);};
$('retry').onclick=()=>{const t=video.currentTime||seekTarget||0;pause();status('正在重新载入影片…');seekTarget=t;video.load();};
const dialog=$('detail-dialog');
$('inspect').onclick=()=>{pause();const c=cueAt(video.currentTime);$('detail-title').textContent=c.label;$('detail-frame').src='../journey/?inspect=1&value='+encodeURIComponent(inspectionValue(video.currentTime))+'#'+c.stage;dialog.showModal();};
$('close-detail').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{$('detail-frame').src='about:blank';$('inspect').focus();update();});
video.addEventListener('loadedmetadata',()=>{for(const track of video.textTracks||[])track.mode='disabled';total=Number.isFinite(video.duration)?video.duration:total;$('scrub').max=total;if(seekTarget!==null){video.currentTime=Math.min(total,seekTarget);seekTarget=null;}status('');update();});
video.addEventListener('timeupdate',update);
video.addEventListener('play',()=>{started=true;update();});
video.addEventListener('playing',()=>{buffering=false;status('');narrator.speak(narrationAt(video.currentTime));update();});
video.addEventListener('pause',()=>{narrator.cancel();update();});
video.addEventListener('ended',()=>{narrator.cancel();update();});
video.addEventListener('waiting',()=>{buffering=true;narrator.cancel();if(started)status('正在缓冲…');});
video.addEventListener('seeking',()=>{narrator.cancel();});
video.addEventListener('seeked',()=>{buffering=false;lastCue=null;update();if(isPlaying())narrator.speak(narrationAt(video.currentTime));});
video.addEventListener('error',()=>{narrator.cancel();status('影片暂时未能加载。请重试，或先进入各阶段探索。',true);});
video.addEventListener('canplay',()=>{if(!video.error){buffering=false;status('');}});
// The selected movie speed never replays or accelerates a sentence already in progress.
video.addEventListener('ratechange',update);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
window.addEventListener('pagehide',event=>{disposing=true;pause();if(event.persisted)narrator.cancel();else narrator.dispose();});
window.addEventListener('pageshow',event=>{if(event.persisted){disposing=false;narrator.discover();update();}});
$('player').addEventListener('keydown',event=>{if(event.target!==$('player'))return;if(event.code==='Space'){event.preventDefault();toggle();}if(event.code==='ArrowRight'){event.preventDefault();seek(video.currentTime+5);}if(event.code==='ArrowLeft'){event.preventDefault();seek(video.currentTime-5);}});
document.querySelector('.skip').onclick=event=>{event.preventDefault();$('player').focus();$('player').scrollIntoView({block:'start'});};
const hashChapter=chapters.find(c=>c[0]===location.hash.slice(1));if(hashChapter)seek(hashChapter[2]);update();
