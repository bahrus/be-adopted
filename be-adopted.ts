import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeAdoptedActions, BeAdoptedVirtualProps, PP, Proxy} from './types';

export class BeAdopted extends EventTarget implements BeAdoptedActions{
    async intro(proxy: Proxy, target: HTMLStyleElement){
        import('be-loaded/be-loaded.js');
        const parent = target.parentElement;
        if(parent === null) return;
        if(parent.shadowRoot !== null){
            this.addToShadowRoot(parent.shadowRoot, target);
            proxy.resolved = true;
        }else{
            await customElements.whenDefined(parent.localName);
            requestIdleCallback(() => {
                if(parent.shadowRoot !== null){
                    this.addToShadowRoot(parent.shadowRoot, target);
                    proxy.resolved = true;
                }else{
                    const msg = 'ShadowRoot not found.'
                    proxy.rejected = msg;
                    throw new Error(msg);
                }
            });
        }
    }

    addToShadowRoot(shadowRoot: ShadowRoot, target: HTMLStyleElement): void {
        shadowRoot.appendChild(target);
        //TODO -- use ifWantToBe's
        target.setAttribute('be-loaded', target.getAttribute('is-adopted')!);
    }
}


const tagName = 'be-adopted';

const ifWantsToBe = 'adopted';

const upgrade = 'style';

define<BeAdoptedVirtualProps & BeDecoratedProps<BeAdoptedVirtualProps, BeAdoptedActions>, BeAdoptedActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            forceVisible: ['style'],
            virtualProps: ['CDNFallback', 'path', 'version', 'removeStyle'],
            primaryProp: 'path',
            intro: 'intro',
        }
    },
    complexPropDefaults:{
        controller: BeAdopted,
    }
});

register(ifWantsToBe, upgrade, tagName);