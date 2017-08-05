import { Component, Directive, Input, Injectable } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigateTo: any = null;

    onClick() {
        this.navigateTo = this.linkParams;
    }
}
