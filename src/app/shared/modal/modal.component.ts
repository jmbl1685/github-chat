import { Component, OnInit, HostListener } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  imgUrl: string;
  enable: boolean;

  constructor(private eventService: EventService) {
    this.enable = false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.enable) {
      this.hideModal();
    }
  }

  ngOnInit() {
    this.eventService.listen().subscribe(res => {
      switch (res.type) {
        case 'OPEN_IMAGE_MODAL':
          this.imgUrl = res.data.imgUrl;
          this.enable = true;
          break;
      }
    });
  }

  hideModal() {
    this.enable = false;
    this.eventService.finish();
  }
}
