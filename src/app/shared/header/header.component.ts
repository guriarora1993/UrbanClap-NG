import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  progressPercentage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initVideo();
  }

  initVideo() {
    const video = this.videoPlayer.nativeElement;
    video.addEventListener('timeupdate', () => {
      this.updateProgress();
    });
  }

  playPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  updateProgress() {
    const video = this.videoPlayer.nativeElement;
    if (video) {
      this.progressPercentage = (video.currentTime / video.duration) * 100;
    }
  }
}
