"use client";

import React from "react";
import { SettingsSidebar } from "./_components/settings-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <SettingsSidebar />
        {children}
      </div>
    </>
  );
}
