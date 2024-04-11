import {
  Box, Card, CardHeader, CircularProgress, Container,
  IconButton, Tooltip,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { LineChart } from '@mui/x-charts/LineChart';
import HouseIcon from '@mui/icons-material/House';
import { useDataFetch } from '../../api/useApiFetch';
import { useServerData } from '../../providers/ServerData';
import { DisplayIntervalPicker } from '../../components/common/DisplayIntervalPicker';
import { SmartChooseHouseDialog, SmartChooseHouseValue } from '../../components/common/smart/SmartChooseHouseDialog';

function ExpectedEarnReport() {
  const { expectedEarnReport } = useServerData();
  const [interval, setInterval] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31),
  });

  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [house, setHouse] = useState<SmartChooseHouseValue>({ all: true });

  const [report, reportPending] = useDataFetch(() => {
    return expectedEarnReport.getByMonthReport({ ...interval, houseId: house.house?.id });
  }, [interval, house]);

  const subTitle = useMemo(() => {
    if (house.all) { return 'all houses'; }
    return house.house?.name;
  }, [house]);

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
      <SmartChooseHouseDialog
        onApply={setHouse}
        value={house}
        open={isHouseModalOpen}
        onClose={() => setIsHouseModalOpen(false)}
        allowChooseAll
      />
    </>
  );
}

export default ExpectedEarnReport;
