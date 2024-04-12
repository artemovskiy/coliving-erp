package site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.controller;

import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.artemovskiy.colivingerp.common.time.DateSpan;
import site.artemovskiy.colivingerp.common.time.DateUtil;
import site.artemovskiy.colivingerp.modules.houses.repository.HouseRepository;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.dto.MonthExpectedEarnReportDto;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.api.mapper.ExpectedEarnReportMapper;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.dto.MonthExpectedEarn;
import site.artemovskiy.colivingerp.modules.reports.excpectedearn.persistance.ExpectedEarnReportDao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/report/expected-earn")
public class ExpectedEarnReportController {

    @Autowired
    private ExpectedEarnReportDao expectedEarnReportDao;

    @Autowired
    private ExpectedEarnReportMapper expectedEarnReportMapper;

    @Autowired
    private HouseRepository houseRepository;

    @GetMapping(path = "by-month")
    public ResponseEntity<MonthExpectedEarnReportDto> getBeMonth(
            @RequestParam(name = "start-date") LocalDate startDate,
            @RequestParam(name = "end-date") LocalDate endDate,
            @RequestParam(name = "house-id", required = false) Integer houseId
    ) {
        LocalDate firstDayOfStartMonth = startDate.withDayOfMonth(1);
        if (!startDate.isEqual(firstDayOfStartMonth)) {
            throw new ValidationException("startDate expected to be the first day of any month");
        }
        LocalDate lastDayOfEndMonth = DateUtil.endOfMonth(endDate);
        if (!endDate.isEqual(lastDayOfEndMonth)) {
            throw new ValidationException("endDate expected to be the last day of any month");
        }

        if (startDate.isAfter(endDate)) {
            throw new ValidationException("endDate expected to be greater than startDate");
        }
        DateSpan timeBorders = DateSpan.of(startDate, endDate.plusDays(1));

        List<MonthExpectedEarn> result;
        if (houseId != null) {
            boolean houseExists = houseRepository.existsById(houseId);
            if (!houseExists) {
                return ResponseEntity.badRequest().build();
            }
            result = expectedEarnReportDao.getByMonthOfHouse(timeBorders, houseId);
        } else {
            result = expectedEarnReportDao.getByMonth(timeBorders);
        }

        MonthExpectedEarnReportDto report = new MonthExpectedEarnReportDto();
        report.monthsCount = result.size();
        report.rows = result.stream().map(expectedEarnReportMapper::monthExpectedEarnToReportRow).toList();
        double average = result.stream().map(i -> i.getValue()).mapToDouble(Integer::doubleValue).average().orElse(0.0);
        report.average = BigDecimal.valueOf(Math.round(average)).movePointLeft(2).toString();

        return ResponseEntity.ok(report);
    }
}
