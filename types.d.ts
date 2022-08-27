import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {BeLoadedVirtualProps} from 'be-loaded/types';

export interface BeAdoptedVirtualProps extends BeLoadedVirtualProps{}

export interface BeAdoptedProps extends BeAdoptedVirtualProps{
    proxy: HTMLStyleElement & BeAdoptedVirtualProps;
}

export interface BeAdoptedActions{
    intro(proxy: HTMLStyleElement & BeLoadedVirtualProps, target: HTMLStyleElement, beDecor: BeDecoratedProps): void;
}