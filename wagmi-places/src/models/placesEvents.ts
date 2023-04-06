export interface VoteForColorPixelEvent {
  x: number;
  y: number;
  colorId: number;
  voter: string;
}
export interface PixelChangedEvent {
  x: number;
  y: number;
  color: number;
  voteCount: number;
}
export interface MapSizeChangedEvent {
  newMapWidth: number;
  newMapHeight: number;
}
