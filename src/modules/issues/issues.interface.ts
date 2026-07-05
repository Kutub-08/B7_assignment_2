export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface IIssue {
  title: string;
  description: string;
  type: "bug" | "feature_request";
}