class Player{
  state: State;

  constructor(){
    this.state = new readyState(this);
  }

  changeState(state: State){
    this.state = state;
  }

  clickLock(){
    this.state.clickLock();
  } 

  clickPlay(){
    this.state.clickPlay();
  }  

  clickNext(){
    this.state.clickNext();
  }  

  clickPrevious(){
    this.state.clickPrevious();
  }

  startPlayback(): void {
    console.log('Started Playback');
  }

  stopPlayback(): void {
    console.log('Stopped Playback');
  }

  nextSong(): void {
    console.log('Next Song');
  }

  previousSong(): void {
    console.log('Previous Song');
  }

  fastForward(): void {
    console.log('Fast Forward');
  }

  rewind(): void {
    console.log('Rewind');
  }


}

abstract class State {
  player: Player;

  constructor(player: Player){
    this.player = player;
  }

  abstract clickLock(): void;
  abstract clickPlay(): void;
  abstract clickNext(): void;
  abstract clickPrevious(): void;

}

class lockedState extends State{
  clickLock(): void {
    
    if (this.player instanceof playingState)    
      this.player.changeState(new playingState(this.player))
    else
      this.player.changeState(new readyState(this.player))
  }

  clickPlay(): void{
    console.log('void');
  }
  clickNext(): void {
    console.log('void');
  }
  clickPrevious(): void {
    console.log('void');
  }

}

class readyState extends State{
  clickLock(): void{
    
    this.player.changeState(new lockedState(this.player));    
  }

  clickPlay(): void {
    console.log('play from ready');
    this.player.startPlayback();
    this.player.changeState(new playingState(this.player));
  }

  clickNext(): void {
    this.player.nextSong();
    this.player.changeState(new playingState(this.player)); 
  }

  clickPrevious(): void {
    this.player.previousSong();
    this.player.changeState(new playingState(this.player));  
  }


}

class playingState extends State{
  clickLock(): void{
    console.log('Locked');
    this.player.changeState(new lockedState(this.player));
  }

  clickPlay(): void {
    console.log(this.player instanceof playingState  )
    console.log('play from play');
    this.player.stopPlayback();
    this.player.changeState(new readyState(this.player));
  }

  clickNext(): void {
    this.player.nextSong();
  }

  clickPrevious(): void {
    this.player.previousSong();
  }
}


function main(){
  const player = new Player();
  player.clickPlay();
  player.clickPlay();
}

main();