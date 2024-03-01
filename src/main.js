import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { Overlay, Toast, Loading } from 'vant'
import 'vant/lib/index.css';


const app = createApp(App);

app.use(Overlay);
app.use(Toast);
app.use(Loading);

app.mount('#app');
