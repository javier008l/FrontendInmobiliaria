import { Injectable } from "@angular/core";
import { SpinnerComponent } from '../componentes/spinner/spinner.component';
import { Subject } from "rxjs";

@Injectable(
    { providedIn: "root" }
)
export class SpinnerService {
    isLoading$ = new Subject<boolean>;

    show(): void {
        this.isLoading$.next(true)
    }

    hide(): void {
        this.isLoading$.next(false)
    }
}