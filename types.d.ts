import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {BeLoadedVirtualProps} from 'be-loaded/types';

export interface BeAdoptedEndUserProps{}

export interface BeAdoptedVirtualProps extends BeLoadedVirtualProps{}

export type Proxy = HTMLStyleElement & BeAdoptedVirtualProps;

export interface ProxyProps extends BeAdoptedVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface BeAdoptedActions{
    intro(proxy: Proxy, target: HTMLStyleElement, beDecor: BeDecoratedProps): void;
}