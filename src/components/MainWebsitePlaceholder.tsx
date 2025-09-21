import React, { useState } from 'react';
import MainWebsiteServitax from './MainWebsiteServitax';

interface MainWebsitePlaceholderProps {
  onClientLogin?: () => void;
  onNewClient?: () => void;
  onAdminAccess?: () => void;
}

export default function MainWebsitePlaceholder({ onClientLogin, onNewClient, onAdminAccess }: MainWebsitePlaceholderProps): JSX.Element {
  return (
    <MainWebsiteServitax 
      onClientLogin={onClientLogin}
      onNewClient={onNewClient}
      onAdminAccess={onAdminAccess}
    />
  );
}
