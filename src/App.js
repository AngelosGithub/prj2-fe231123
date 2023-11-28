import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MemberSignup } from "./pages/member/MemberSignup";
import { MemberLogin } from "./pages/member/MemberLogin";
import { MemberInfo } from "./pages/member/MemberInfo";
import { ReviewList } from "./pages/review/ReviewList";
import { ReviewWrite } from "./pages/review/ReviewWrite";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="signup" element={<MemberSignup />} />
      <Route path="login" element={<MemberLogin />} />
      <Route path="member" element={<MemberInfo />} />
      <Route path="review" element={<ReviewList />} />
      <Route path="write" element={<ReviewWrite />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
