// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/components/WelcomePage.vue';
import HomePage from '@/components/HomePage.vue';
import FirstPage from '@/components/FirstPage.vue';
import SecondPage from '@/components/SecondPage.vue';
import ThirdPage from '@/components/ThirdPage.vue';
import FourthPage from '@/components/FourthPage.vue';
import FifthPage from '@/components/FifthPage.vue';
import SixthPage from '@/components/SixthPage.vue';
import SeventhPage from '@/components/SeventhPage.vue';
import EighthPage from '@/components/EighthPage.vue';
import NinthPage from '@/components/NinthPage.vue';
import ThanksPage from '@/components/ThanksPage.vue';

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/firstPage',
    name: 'FirstPage',
    component: FirstPage
  },
  {
    path: '/secondPage',
    name: 'SecondPage',
    component: SecondPage
  },
  {
    path: '/thirdPage',
    name: 'ThirdPage',
    component: ThirdPage
  },
  {
    path: '/fourthPage',
    name: 'FourthPage',
    component: FourthPage
  },
  {
    path: '/fifthPage',
    name: 'FifthPage',
    component: FifthPage
  },
  {
    path: '/sixthPage',
    name: 'SixthPage',
    component: SixthPage
  },
  {
    path: '/seventhPage',
    name: 'SeventhPage',
    component: SeventhPage
  },
  {
    path: '/eighthPage',
    name: 'EighthPage',
    component: EighthPage
  },
  {
    path: '/ninthPage',
    name: 'NinthPage',
    component: NinthPage
  },
  {
    path: '/thanksPage',
    name: 'ThanksPage',
    component: ThanksPage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;