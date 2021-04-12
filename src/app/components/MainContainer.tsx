import React, { useEffect } from "react";
import { ControlPanel } from "./ControlPanel";
import { PreviewView } from "./PreviewView";

export const MainContainer = () => {
  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <main>
      <PreviewView />
      <ControlPanel />
    </main>
  );
};
