import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeAdoptedActions, BeAdoptedProps, BeAdoptedVirtualProps} from './types';

export class BeAdopted implements BeAdoptedActions{
    async intro(proxy: HTMLStyleElement & BeAdoptedVirtualProps, target: HTMLStyleElement): void {
        const parent = target.parentElement;
        if(parent === null) return;
        if(parent.shadowRoot !== null){
            this.addToShadowRoot(parent.shadowRoot, target);
        }else{
            await customElements.whenDefined(parent.localName);
            requestIdleCallback(() => {
                if(parent.shadowRoot !== null){
                    this.addToShadowRoot(parent.shadowRoot, target);
                }else{
                    throw new Error('ShadowRoot not found');
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

export interface BeAdopted extends BeAdoptedProps{}

const tagName = 'be-adopted';

const ifWantsToBe = 'adopted';

const upgrade = 'style';

define<BeAdoptedProps & BeDecoratedProps<BeAdoptedProps, BeAdoptedActions>, BeAdoptedActions>({
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