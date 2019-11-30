<?php

namespace src\db;

use PDO;
use PDOStatement;

/**
 * Class DBAccess
 * @package DB
 */
class DBAccess
{
    private $dbh;

    public function __construct($dsn, $user, $password)
    {
        $this->dbh = new PDO($dsn, $user, $password);
    }

    /**
     * @param string $sql
     * @param array $arrayDate
     * @return bool|PDOStatement
     */
    public function get_sql_execution(string $sql, array $arrayData)
    {
        $sth = $this->dbh->prepare($sql);
        $sth->execute($arrayData);

        return $sth;
    }
}