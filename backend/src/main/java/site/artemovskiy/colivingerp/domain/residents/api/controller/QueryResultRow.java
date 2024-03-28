package site.artemovskiy.colivingerp.domain.residents.api.controller;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class QueryResultRow {

    @Id
    public Long id;
    //    @Column(name = "houseId")
    public int houseId;
    //    @JdbcTypeCode(SqlTypes.INTEGER)
    public int accommodationId;
    //    @JdbcTypeCode(SqlTypes.VARCHAR)
    public String residentName;

    public QueryResultRow() {

    }
}