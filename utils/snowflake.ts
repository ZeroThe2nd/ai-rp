import { SnowflakeId } from '@akashrajpurohit/snowflake-id';

export const snowflake = (workerId: number = 416) => SnowflakeId({
    epoch: 1713260711000, // 2024-04-16T09:45:11+00:00
    workerId,
})

export const getSnowflake = (workerId: number = 416) => snowflake(workerId).generate();
