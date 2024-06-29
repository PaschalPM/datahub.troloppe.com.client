import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoaderComponent } from '@components/loader/loader.component';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DataHUB';

  constructor(private router: Router, private loader: LoaderService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.start();
      }
      if (event instanceof NavigationEnd) {
        this.loader.stop();
      }
    });
  }
}
