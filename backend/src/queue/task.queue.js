import redisClient from "../config/redis.js";

export const addTaskToQueue = async (task) => {
  try {
    await redisClient.lPush("taskQueue", JSON.stringify(task));

    console.log("Task added to redis queue");
  } catch (error) {
    console.log("Queue Error: ", error);
  }
};


  export const getTaskFromQueue = async () => {
    const task = await redisClient.rPop("taskQueue");

    return task;
  };
