type NomadCardApiSuccessResponse<T> = {
  status: 'success';
  data: T;
};

type NomadCardApiErrorResponse = {
  status: 'error';
  message: string;
  code?: number;
  data?: {
    path: string;
    timestamp: string;
  };
};

type NomadCardApiWhoAmIResponse = NomadCardApiSuccessResponse<{
  id: string;
  createAt: string;
  updateAt: string;
  address: string;
  holderId?: string;
  cardId?: string;
  verified: boolean;
}>;
