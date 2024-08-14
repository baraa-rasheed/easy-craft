
import { request } from "./request"; 
 

export const authApis = {
  login: ({ email }: { email?: string }) => {
    return request.post(`/auth/login`, { email });
  },
};
