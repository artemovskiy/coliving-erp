import {
  Box, Card, CardHeader, CircularProgress, Container,
  IconButton, Tooltip,
} from '@mui/material';
import {
  useCallback, useMemo, useState,
} from 'react';
import { format } from 'date-fns';
import { LineChart } from '@mui/x-charts/LineChart';
import HouseIcon from '@mui/icons-material/House';
import { useDataFetch } from '../../api/useApiFetch';
import { useServerData } from '../../providers/ServerData';
import { DisplayIntervalPicker } from '../../components/common/DisplayIntervalPicker';
import { ChooseHouseDialog } from '../../components/common/input/ChooseHouseDialog';
import { ChooseHouseValue } from '../../components/common/input/ChooseHouseDialog/types';

function ExpectedEarnReport() {
  const { expectedEarnReport } = useServerData();
  const [interval, setInterval] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31),
  });

  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const { houses: houseRepo } = useServerData();
  const [houses] = useDataFetch(() => houseRepo.list(), []);
  const [house, setHouse] = useState<ChooseHouseValue>({ all: true });
  const [houseId, setHouseId] = useState<number | undefined>();
  const handleChooseHouseApply = useCallback(() => {
    if (house?.all) {
      setHouseId(undefined);
    } else {
      setHouseId(house?.houseId);
    }
    setIsHouseModalOpen(false);
  }, [house]);
  const [report, reportPending] = useDataFetch(() => {
    return expectedEarnReport.getByMonthReport({ ...interval, houseId });
  }, [interval, houseId]);

  const subTitle = useMemo(() => {
    if (!houseId) { return 'all houses'; }
    const houseData = houses?.find((i) => i.id === houseId);
    return houseData?.name;
  }, [houseId, houses]);

  return (
    <>
      <Container>
        <Card sx={{ padding: 2 }}>
          <CardHeader
            // eslint-disable-next-line react/jsx-one-expression-per-line
            title={<>Expected earn <small>{subTitle}</small></>}
            action={(
              <Box sx={{ display: 'flex' }}>
                <Tooltip title="choose house">
                  <IconButton onClick={() => setIsHouseModalOpen(true)} aria-label="choose house">
                    <HouseIcon />
                  </IconButton>
                </Tooltip>
                <DisplayIntervalPicker value={interval} onChange={setInterval} />
              </Box>
            )}
          />
          { reportPending && <CircularProgress />}
          { !!report && (
          <LineChart
            xAxis={[
              { scaleType: 'point', data: report.rows?.map((item) => format(item.monthStart!, 'yyyy-MM-dd')) },
            ]}
            series={[
              { label: 'Monthly', data: report.rows?.map((item) => parseFloat(item.value as string)) },
              {
                label: 'Average',
                data: report.rows?.map(() => parseFloat(report.average as string)),
                showMark: false,
              },
            ]}
            height={400}
            margin={{ left: 70 }}
          />
          )}
        </Card>
      </Container>
      <ChooseHouseDialog
        onChange={setHouse}
        value={house}
        onApply={handleChooseHouseApply}
        open={isHouseModalOpen}
        onClose={() => setIsHouseModalOpen(false)}
        optionsPending={false}
        options={houses}
        allowChooseAll
      />
    </>
  );
}

export default ExpectedEarnReport;
