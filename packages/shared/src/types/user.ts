/**
 * User Types
 * Types for users and authentication
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  teamId?: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | 'admin'
  | 'sales_manager'
  | 'account_manager'
  | 'sales_ops'
  | 'viewer';

export interface Team {
  id: string;
  name: string;
  managerId: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermissions {
  canViewAllAccounts: boolean;
  canEditAccounts: boolean;
  canViewAllOpportunities: boolean;
  canEditOpportunities: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canManageTeams: boolean;
  canExportData: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canViewAllAccounts: true,
    canEditAccounts: true,
    canViewAllOpportunities: true,
    canEditOpportunities: true,
    canViewAnalytics: true,
    canManageUsers: true,
    canManageTeams: true,
    canExportData: true,
  },
  sales_manager: {
    canViewAllAccounts: true,
    canEditAccounts: true,
    canViewAllOpportunities: true,
    canEditOpportunities: true,
    canViewAnalytics: true,
    canManageUsers: false,
    canManageTeams: true,
    canExportData: true,
  },
  account_manager: {
    canViewAllAccounts: false,
    canEditAccounts: true,
    canViewAllOpportunities: false,
    canEditOpportunities: true,
    canViewAnalytics: false,
    canManageUsers: false,
    canManageTeams: false,
    canExportData: false,
  },
  sales_ops: {
    canViewAllAccounts: true,
    canEditAccounts: false,
    canViewAllOpportunities: true,
    canEditOpportunities: false,
    canViewAnalytics: true,
    canManageUsers: false,
    canManageTeams: false,
    canExportData: true,
  },
  viewer: {
    canViewAllAccounts: true,
    canEditAccounts: false,
    canViewAllOpportunities: true,
    canEditOpportunities: false,
    canViewAnalytics: true,
    canManageUsers: false,
    canManageTeams: false,
    canExportData: false,
  },
};
