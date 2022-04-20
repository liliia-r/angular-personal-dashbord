import { NotificationService } from './../shared/notification.service';
import { BookmarkService } from './../shared/bookmark.service';
import { Bookmark } from './../shared/bookmark.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');

      this.bookmark = this.bookmarkService.getBookmark(`${bookmarkId}`);
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      const id = this.bookmark ? this.bookmark.id : '';

      const { name, url } = form.value;

      this.bookmarkService.updateBookmark(id, { name, url: new URL(url) });

      this.notificationService.show('Bookmark updated!');
    }
  }

  delete() {
    const id = this.bookmark ? this.bookmark.id : '';

    this.bookmarkService.deleteBookmark(id);
    this.router.navigate(['../'], { relativeTo: this.route });

    this.notificationService.show('Bookmark deleted!');
  }
}
