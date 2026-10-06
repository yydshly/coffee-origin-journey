/** A conservative text budget, not a guarantee about any device's Chinese voice. */
export function estimatedSpeechSeconds(text){
 const chars=Array.from(text).filter(c=>/[\p{L}\p{N}]/u.test(c)).length;
 const pauses=(text.match(/[，、。！？；]/g)||[]).length;
 return chars/3.6+pauses*.12+.15;
}
/** Device TTS is optional; the fixed-camera movie/subtitles remain the source of truth. */
export function createNarrator({synth,Utterance,onStatus=()=>{},isPlaying=()=>false,getCue=()=>null,getPlaybackRate=()=>1,getTime=()=>getCue()?.start||0}) {
 let voice=null,enabled=false,current=null,generation=0,disposed=false,waiting=false;
 const supported=!!(synth&&Utterance);
 function report(extra={}){onStatus({supported,available:!!voice,enabled,waiting,voiceName:voice?.name||'',...extra});}
 function discover(){if(disposed)return null;const voices=supported?synth.getVoices():[];voice=voices.find(v=>/^zh[-_]CN/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang))||null;if(!voice&&enabled){enabled=false;cancel();}report();return voice;}
 function cancel(){generation++;current=null;waiting=false;if(supported)synth.cancel();}
 function speak(cue,{force=false}={}){
  if(disposed||!enabled||!voice||!cue||!isPlaying())return false;
  if(current===cue.start&&!force)return false;
  cancel();current=cue.start;
  const time=getTime(),remaining=(cue.end-time)/Math.max(.25,getPlaybackRate());
  // After a late resume/seek, keep the complete subtitle and wait for the next sentence.
  // Do not squeeze an entire sentence into the end of its action, or restart at every cut.
  if(time-cue.start>.4&&remaining<estimatedSpeechSeconds(cue.text)){waiting=true;report();return false;}
  const token=generation,utterance=new Utterance(cue.text);utterance.voice=voice;utterance.lang=voice.lang;utterance.volume=1;
  utterance.rate=1;report();
  utterance.onerror=event=>{if(token===generation&&!disposed&&!['canceled','interrupted'].includes(event.error)){enabled=false;cancel();report({error:true});}};
  synth.speak(utterance);return true;
 }
 function setEnabled(value){enabled=!!value&&!!discover();cancel();report();if(enabled&&isPlaying())speak(getCue(),{force:true});return enabled;}
 const changed=()=>discover();if(supported)synth.addEventListener?.('voiceschanged',changed);discover();
 return {discover,cancel,speak,setEnabled,get enabled(){return enabled;},get available(){return !!voice;},dispose(){disposed=true;cancel();synth?.removeEventListener?.('voiceschanged',changed);}};
}
