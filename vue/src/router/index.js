import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Surveys from "../views/Surveys.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    component: DefaultLayout,
    // children will be render on the DefaultLayout component
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/surveys", name: "Surveys", component: Surveys },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// If requiresAuth is true and there is not a token in user object, redirect to Login
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (
    // if there is token, and trying to access a guest route, redirect to Dashboard
    store.state.user.token &&
    to.meta.isGuest
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
