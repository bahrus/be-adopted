import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeAdopted {
    async intro(proxy, target) {
        import('be-loaded/be-loaded.js');
        const parent = target.parentElement;
        if (parent === null)
            return;
        if (parent.shadowRoot !== null) {
            this.addToShadowRoot(parent.shadowRoot, target);
        }
        else {
            await customElements.whenDefined(parent.localName);
            requestIdleCallback(() => {
                if (parent.shadowRoot !== null) {
                    this.addToShadowRoot(parent.shadowRoot, target);
                }
                else {
                    throw new Error('ShadowRoot not found');
                }
            });
        }
    }
    addToShadowRoot(shadowRoot, target) {
        shadowRoot.appendChild(target);
        //TODO -- use ifWantToBe's
        target.setAttribute('be-loaded', target.getAttribute('is-adopted'));
    }
}
const tagName = 'be-adopted';
const ifWantsToBe = 'adopted';
const upgrade = 'style';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['style'],
            virtualProps: ['CDNFallback', 'path', 'version', 'removeStyle'],
            primaryProp: 'path',
            intro: 'intro',
        }
    },
    complexPropDefaults: {
        controller: BeAdopted,
    }
});
register(ifWantsToBe, upgrade, tagName);
