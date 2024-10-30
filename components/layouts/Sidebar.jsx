'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserSidebarLinks, AdminSidebarLinks, StaffSidebarLinks } from '.';
import {
  getToken,
  removeToken,
  removeLoginTime,
  getLoginTime,
} from '@/utils/authHelpers';
import { useGetCurrentUserQuery } from '@/store/api/userApi';
import { LogoutIcon, Offline, crossIcon } from '@/svgs';
import Avatar from '../Avatar';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRole,
  selectUser,
  setUser,
  setRole,
  clearUser,
} from '@/store/features/userSlice';

const activeClass = 'bg-blue-700 hover:bg-blue-600';

const Sidebar = ({
  display,
  lg_display,
  zIndex,
  showSidebar,
  setShowSidebar,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const currentUser = useSelector(selectUser);
  // const isOnline = useNetworkStatus();

  const { isLoading, isSuccess, isError, error, data } = useGetCurrentUserQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: !getToken(),
    }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data.user));
      dispatch(setRole(data.data.role));
    }
  }, [data, dispatch]);

  // I'm  Initialising from localStorage if Redux state is empty, because the user is not persistent with redux
  useEffect(() => {
    if (!currentUser && !role && typeof window !== 'undefined') {
      const persistedUser = localStorage.getItem('persistedUser');
      const persistedRole = localStorage.getItem('userRole');

      if (persistedUser && persistedRole) {
        try {
          dispatch(setUser(JSON.parse(persistedUser)));
          dispatch(setRole(persistedRole));
        } catch (error) {
          console.error('Error loading persisted state:', error);
        }
      }
    }
  }, [currentUser, role, dispatch]);

  const openProfilePage = () => {
    if (role === 'ADMIN' || role === 'STAFF') {
      router.push('/admin/profile');
    } else if (role === 'USER') {
      router.push('/user/profile');
    }
  };

  const logout = () => {
    dispatch(clearUser());
    router.replace('/');
    removeToken();
    removeLoginTime();
  };

  // useEffect(() => {
  //   const loginTime = getLoginTime();
  //   if (loginTime) {
  //     const twentyFourHours = 24 * 60 * 60 * 1000;
  //     const checkExpiry = () => {
  //       const currentTime = new Date().getTime();
  //       const elapsedTime = currentTime - parseInt(loginTime, 10);
  //       if (elapsedTime >= twentyFourHours) {
  //         logout();
  //       }
  //     };
  //     checkExpiry();
  //     const interval = setInterval(checkExpiry, 60000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  // In Sidebar.js
  useEffect(() => {
    // Add a small delay to prevent immediate redirect
    const checkToken = setTimeout(() => {
      if (!getToken()) {
        router.replace('/');
      }
    }, 500);

    return () => clearTimeout(checkToken);
  }, [router]);

  const renderLinks = () => {
    if (!role) return null;

    let links;
    switch (role.toLowerCase()) {
      case 'user':
        links = UserSidebarLinks;
        break;
      case 'staff':
        links = StaffSidebarLinks;
        break;
      case 'admin':
        links = AdminSidebarLinks;
        break;
      default:
        links = [];
    }

    return links.map((link, index) => (
      <div key={link.id}>
        <li
          className={`${
            pathname === link.href ? activeClass : ''
          } flex items-center gap-2 p-2 rounded-md mb-3 text-xs`}
        >
          <span>{link.icon}</span>
          <Link href={link.href}>{link.name}</Link>
        </li>
        {index === 0 && <hr className="border-gray-600" />}
      </div>
    ));
  };

  if (isError) {
    const isAuthError = error?.status === 401;
    if (isAuthError) {
      logout();
      return null;
    }
    return (
      <div className="text-red-500 p-4">
        Error: {error?.data?.message || 'Failed to load sidebar'}
      </div>
    );
  }

  const showLoadingState = isLoading && !role && !currentUser;

  const hasUserData = role && currentUser;

   return (
    <aside
      className={`h-screen bg-[#1A191B] px-2 fixed top-0 w-[12rem] z-[1000] overflow-y-auto lg:block ${showSidebar}`}
    >
      <span
        className="w-12 h-12 lg:hidden ml-32 mt-6"
        onClick={() => setShowSidebar('hidden')}
      >
        {crossIcon}
      </span>
      <div className="flex flex-col space-y-3 text-white mt-2">
        <ul className="lg:mt-28 space-y-3 text-sm">
          {showLoadingState &&
            [1, 2, 3, 4, 5].map((loader) => (
              <div
                key={loader}
                className="w-full h-8 rounded-md bg-gray-700 animate-pulse"
              ></div>
            ))}
          {hasUserData && renderLinks()}
        </ul>

        <div className="text-sm py-8 lg:py-6">
          {/* {!isOnline && (
            <div className="flex items-center gap-2">
              <span>{Offline}</span>
              <span>Offline</span>
            </div>
          )} */}
          <button
            onClick={logout}
            className="flex items-center gap-1 px-6 py-2 bg-blue-800 rounded-md hover:bg-blue-700 transform active:scale-75 transition-transform"
          >
            <span>{LogoutIcon}</span>
            <span>Logout</span>
          </button>
        </div>

        {hasUserData && (
          <div
            onClick={openProfilePage}
            className="flex items-center gap-2 cursor-pointer pb-4"
          >
            <Avatar currentUser={currentUser} role={role} />
            <div className="space-y-1">
              <p className="text-xs">
                {role !== 'USER'
                  ? currentUser?.name
                  : `${currentUser?.first_name} ${currentUser?.last_name}`}
              </p>
              <p className="text-xs text-gray-200">
                {role === 'ADMIN' ? 'Admin' : 'Applicant'}
              </p>
            </div>
          </div>
        )}

        {showLoadingState && (
          <div className="fixed bottom-6 flex justify-center items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full animate-pulse bg-gray-700"></div>
            <div className="space-y-2">
              <p className="w-12 h-2 animate-pulse bg-gray-700"></p>
              <p className="w-24 h-3 animate-pulse bg-gray-700"></p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
