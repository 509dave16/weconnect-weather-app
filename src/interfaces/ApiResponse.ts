import { ApiResponseState } from './Enums'

export interface ApiResponse {
  result: any;
  state: ApiResponseState;
}
