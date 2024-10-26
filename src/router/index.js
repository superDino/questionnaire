// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/components/WelcomePage.vue';
import ConditionPage from '@/components/ConditionPage.vue';
import ConsentFormPage from '@/components/ConsentFormPage.vue';
import V2gExplainPage from '@/components/V2gExplainPage.vue';
import BasicInfoPage from '@/components/BasicInfoPage.vue';
import V2gKnowledgePage from '@/components/V2gKnowledgePage.vue';
import GreenBehaviorPage from '@/components/GreenBehaviorPage.vue';
import V2gScenarioTipsPage from '@/components/V2gScenarioTipsPage.vue';
import V2gScenarioPage from '@/components/V2gScenarioPage.vue';
import BatteryInvestmentPage from '@/components/BatteryInvestmentPage.vue';
import ThanksPage from '@/components/ThanksPage.vue';

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/conditionPage',
    name: 'ConditionPage',
    component: ConditionPage
  },
  {
    path: '/consentFormPage',
    name: 'ConsentFormPage',
    component: ConsentFormPage
  },
  {
    path: '/v2gExplainPage',
    name: 'V2gExplainPage',
    component: V2gExplainPage
  },
  {
    path: '/basicInfoPage',
    name: 'BasicInfoPage',
    component: BasicInfoPage
  },
  {
    path: '/v2gKnowledgePage',
    name: 'V2gKnowledgePage',
    component: V2gKnowledgePage
  },
  {
    path: '/greenBehaviorPage',
    name: 'GreenBehaviorPage',
    component: GreenBehaviorPage
  },
  {
    path: '/v2gScenarioTipsPage',
    name: 'V2gScenarioTipsPage',
    component: V2gScenarioTipsPage
  },
  {
    path: '/v2gScenarioPage',
    name: 'V2gScenarioPage',
    component: V2gScenarioPage
  },
  {
    path: '/batteryInvestmentPage',
    name: 'BatteryInvestmentPage',
    component: BatteryInvestmentPage
  },
  {
    path: '/thanksPage',
    name: 'ThanksPage',
    component: ThanksPage
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;