# Focus dev tools

The purpose of these dev tools is to provide help for your focus projects:

- Store data and store state
- Routes informations

Its purpose is also to allow us to collect some __satisfaction__ indicators.

Here is a short video demo of this tool

[A video of the component in action](https://youtu.be/XuaWkIbWR-A)


## How to use it

You have two components at your disposal:

- A dispatcher logger which can help you trace all the incoming actions to your app

```javascript
import dispatchLogger from 'focus-dev-tools/logger/dispatch-logger';
import dispatcher from 'focus-core/dispatcher';
import CoreStore from 'focus-core/stores/CoreStore'

dispatchLogger(dispatcher, () => CoreStore._instances);
```

- A `FocusDevTools` console to visualize information

``` jsx

import FocusDevTools from 'focus-dev-tools';
<FocusDevTools
  isPanel={true} /* If you want to embed the component in a DOck */
  user='Your name' /*can be set by an env variable*/
  project='focus_devtools' /*can be set by an env variable*/
  toggleVisibilityKey='ctrl-m'  /*How do you want to display the dev tool*/
  routes={routes}  /* A list of all your routes (`focus-core/router/history`)*/
  stores={strs} /* A list of all your stores (`focus-core/CoreStore._instances`)*/
  isDebugDevTools={false} /* If you want to display the dev tools props (not usefull for the projects)*/
/>
```
