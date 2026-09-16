import React from 'react';
import { Header, HeaderProfileProps } from './Header';
import { Footer, FooterContactsProps } from './Footer';
import { Body } from './Body';
import { FAKE_HEADER_PROFILE, FAKE_FOOTER_CONTACTS } from '../../api/mockData';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/authSlice';

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  headerProfile?: HeaderProfileProps;
  footerContacts?: FooterContactsProps;
  bodyClassName?: string;
}

export const Page: React.FC<PageProps> = ({
  children,
  headerProfile = FAKE_HEADER_PROFILE,
  footerContacts = FAKE_FOOTER_CONTACTS,
  bodyClassName,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const activeProfile: HeaderProfileProps = user
    ? {
        name: user.name,
        login: user.login,
        role: user.role,
        email: user.email,
        avatarUrl: user.avatarUrl,
      }
    : headerProfile;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
      <Header
        profile={activeProfile}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <Body className={bodyClassName}>{children}</Body>
      <Footer contacts={footerContacts} />
    </div>
  );
};
