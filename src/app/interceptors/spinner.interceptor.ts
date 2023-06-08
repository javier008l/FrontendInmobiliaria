import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from "../servicios/spinner.service";
import { Observable, finalize } from "rxjs";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerSvc: SpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerSvc.show();
        return next.handle(req).pipe(
            finalize(() => this.spinnerSvc.hide()));
    }
}