import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('dealspotter_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Ensure user has points properties
        const updatedUser: User = {
          ...user,
          points: user.points || 0,
          totalPointsEarned: user.totalPointsEarned || 0,
          level: user.level || 1,
          dailyPointsEarned: user.dailyPointsEarned || 0,
          lastPointsDate: user.lastPointsDate || '',
          joinDate: new Date(user.joinDate),
        };
        setAuthState({
          user: updatedUser,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem('dealspotter_user');
      }
    }
  }, []);

  const updateUser = (updatedUser: User) => {
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }));
    localStorage.setItem('dealspotter_user', JSON.stringify(updatedUser));
    
    // Also update in users list
    const existingUsers = JSON.parse(localStorage.getItem('dealspotter_users') || '[]');
    const updatedUsers = existingUsers.map((u: any) => 
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem('dealspotter_users', JSON.stringify(updatedUsers));
  };

  const signUp = async (email: string, username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('dealspotter_users') || '[]');
      const userExists = existingUsers.find((u: any) => u.email === email || u.username === username);
      
      if (userExists) {
        return { success: false, error: 'User with this email or username already exists' };
      }

      // Create new user with points system
      const newUser: User = {
        id: Date.now().toString(),
        email,
        username,
        joinDate: new Date(),
        points: 0,
        totalPointsEarned: 0,
        level: 1,
        dailyPointsEarned: 0,
        lastPointsDate: '',
      };

      // Save to storage
      const updatedUsers = [...existingUsers, { ...newUser, password }];
      localStorage.setItem('dealspotter_users', JSON.stringify(updatedUsers));
      localStorage.setItem('dealspotter_user', JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to create account' };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('dealspotter_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      const { password: _, ...userWithoutPassword } = user;
      
      // Ensure user has points properties
      const updatedUser: User = {
        ...userWithoutPassword,
        points: userWithoutPassword.points || 0,
        totalPointsEarned: userWithoutPassword.totalPointsEarned || 0,
        level: userWithoutPassword.level || 1,
        dailyPointsEarned: userWithoutPassword.dailyPointsEarned || 0,
        lastPointsDate: userWithoutPassword.lastPointsDate || '',
        joinDate: new Date(userWithoutPassword.joinDate),
      };
      
      localStorage.setItem('dealspotter_user', JSON.stringify(updatedUser));

      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to sign in' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('dealspotter_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  // Get total number of registered users
  const getTotalUsers = () => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('dealspotter_users') || '[]');
      return existingUsers.length;
    } catch (error) {
      return 0;
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    getTotalUsers,
    updateUser,
  };
};