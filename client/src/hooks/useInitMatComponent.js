import { useEffect, useRef } from 'react';

import materialize from 'materialize-css/dist/js/materialize';

/**
 * 
 * @param {string} componentName 
 * @param {string} querySelector 
 * @param {object} options 
 * @param {array} effectDependecies 
 * 
 * @description This hook is use to initailze Materialize css
 * components in react application.
 * @arguments componentName should be the name of the
 * component to be initialized.
 * @arguments querySelector should be the class name or 
 * tag name of the component to be initialized base on the 
 * materialized css documentation.
 * 
 * @arguments options is the option object to be passed to 
 * the component
 * 
 * @arguments effectDependecies array of dependecies to that
 * cause the component to re-initialize when they change.
 * @returns ComponentInstance
 */
export default function useInitMatComponent(componentName, querySelector, options = null, effectDependecies = []) {
    if(!Array.isArray(effectDependecies)){
        console.warn('Dependecies must an array')
    }

    const initMatComponent = (componentName, querySelector, options) => {
        let instance;
        const element = document.querySelectorAll(querySelector);
        if (options && typeof (options) === 'object' && options !== null)
            instance = materialize[componentName].init(element, options);
        else instance = materialize[componentName].init(element);
        return instance[0];
    }

    const componentRef = useRef();
    useEffect(() => {
        componentRef.current = initMatComponent(componentName, querySelector, options);
    }, effectDependecies);
    return componentRef.current;
}
