# Focus dev tools

[![master](https://travis-ci.org/KleeGroup/focus-devtools.svg?branch=master)](https://travis-ci.org/KleeGroup/focus-devtools)
[![develop](https://travis-ci.org/KleeGroup/focus-focus-devtools.svg?branch=develop)](https://travis-ci.org/KleeGroup/focus-devtools)

[![Dependencies Status](https://david-dm.org/KleeGroup/focus-devtools.svg)](https://david-dm.org/KleeGroup/focus-devtools)
[![Dev Dependencies Status](https://david-dm.org/KleeGroup/focus-devtools/dev-status.svg)](https://david-dm.org/KleeGroup/focus-devtools?type=dev)
[![Peer Dependencies Status](https://david-dm.org/KleeGroup/focus-devtools/peer-status.svg)](https://david-dm.org/KleeGroup/focus-devtools?type=peer)

Install it with `npm install focus-devtools -D`

By default to display it press `ctrl+m` on your keyboard.

The purpose of these dev tools is to provide help for your focus projects:

- Store data and store state

![image](https://cloud.githubusercontent.com/assets/286966/14531293/fe02b3f0-025c-11e6-983d-98da63b0431b.png)
You can explore all your stores data.

- Routes information

![image](https://cloud.githubusercontent.com/assets/286966/14531339/3a65c92c-025d-11e6-9ab8-371e8cbe4734.png)
You can list all your routes and click on them.

Its purpose is also to allow us to collect some __satisfaction__ indicators.
![image](https://cloud.githubusercontent.com/assets/286966/14531303/1814fe4c-025d-11e6-856c-dd8675a1827d.png)

> Please provide some feedback

Here is a short video demo of this tool

[A video of the component in action](https://youtu.be/lEBuPIyjJeo)
<iframe width="560" height="315" src="https://www.youtube.com/embed/XuaWkIbWR-A" frameborder="0" allowfullscreen></iframe>

## How to use it

You have two components at your disposal:

- A dispatcher logger which can help you trace all the incoming actions to your app

```javascript
import dispatchLogger from 'focus-dev-tools/logger/dispatch-logger';
import dispatcher from 'focus-core/dispatcher';
import CoreStore from 'focus-core/stores/CoreStore'

dispatchLogger(dispatcher, () => CoreStore._instances);
```

- A `FocusDevTools` console to visualize information, create a container component in your project.

``` jsx

import FocusDevTools from 'focus-devtools';
import React from 'react';
import history from 'focus-core/history';
import CoreStore from 'focus-core/store/CoreStore'


const devTools = () => <FocusDevTools
                        isPanel /* If you want to embed the component in a DOck */
                        toggleVisibilityKey={'ctrl-m'}  /*How do you want to display the dev tool*/
                        routes={history.handlers}  /* A list of all your routes (`focus-core/router/history`)*/
                        getStores={() => CoreStore.prototype._instances} /* A list of all your stores (`focus-core/CoreStore._instances`)*/
                        isDebugDevTools={false} /* If you want to display the dev tools props (not usefull for the projects)*//* If you want to display the dev tools props (not usefull for the projects)*/
                         />

export default devTools;
```
It has to be included in the Layout of the application, as an example in the starter kit and the demo app there is a `layout-initializer`
```javascript
import React from 'react';
import Layout from 'focus-components/components/layout';
import MenuLeft from '../../views/menu/menu-left';
import DevTools from '../dev-tools';


const CustomLayout = (props) => (
        <div>
          <Layout
              MenuLeft={MenuLeft}
          >
          {props.children}
          </Layout>
          <DevTools/>
        </div>
);

export default CustomLayout;
```
where DevTools is the container component you just create.

> We hope this will help you and improve your experience with focus.

## Warning

You have to add an explicit name property to your stores.

```javascript

import {CoreStore} from 'focus-core/store';

/**
* Store dealing with subjects about persons.
* @type {focus}
*/
const personStore = new CoreStore({
    definition: {
        personIdentity: 'personIdentity',
        personBiography: 'personBiography',
        personMovieLinks: 'personMovieLinks'
    }
});

personStore.name = 'PersonStore';

export default personStore;
```
