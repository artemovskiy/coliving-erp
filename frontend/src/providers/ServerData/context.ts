import { createContext, useContext } from 'react';
import { HousesRepository } from './houses-repository';
import { AccommodationsRepository } from './accommodations-repository';
import { SlotsRepository } from './slots-repository';
import { RoomsRepository } from './rooms-repository';
import { ResidentsRepository } from './residents-repository';
import { ExpectedEarnReportRepo } from './repos/expected-earn-report-repo';

export interface ServerDataContext {
  houses: HousesRepository;
  accommodations: AccommodationsRepository;
  slots: SlotsRepository,
  rooms: RoomsRepository,
  residents: ResidentsRepository;
  expectedEarnReport: ExpectedEarnReportRepo;
}

export const serverDataContext = createContext<ServerDataContext | null>(null);

export const useServerData = (): Required<ServerDataContext> => {
  const ctxData = useContext(serverDataContext);
  if (!ctxData) {
    throw new Error();
  }

  return ctxData as Required<ServerDataContext>;
};
