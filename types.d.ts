import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {VirtualProps as BeLoadedVirtualProps} from 'be-loaded/types';

export interface EndUserProps{}

export interface VirtualProps extends BeLoadedVirtualProps{}

export type Proxy = HTMLStyleElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    intro(proxy: Proxy, target: HTMLStyleElement, beDecor: BeDecoratedProps): void;
}