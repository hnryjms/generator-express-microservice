export interface IJwtPayload {
  sub?: string;
  exp?: number;
  BechtelUserName?: string;
  BechtelEmailAddress?: string;
  BechtelEmployeeNumber?: string;
}

export interface IUser {
  username?: string,
  first_name?: string,
  last_name?: string,
  roles?: IRole[],
  active?: boolean,
  created_on?: Date,
  created_by?: string,
  updated_on?: Date,
  updated_by?: string
};

export interface IRole {
  name?: string,
  description?: string,
  active?: boolean,
  created_on?: Date,
  created_by?: string,
  updated_on?: Date,
  updated_by?: string
}

export interface IOnAutherize {
  (username: string): Promise<IUser>;
}