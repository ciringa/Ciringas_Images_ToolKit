import * as minio from "minio";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { MINIO_HOST, MINIO_PASSWORD, MINIO_USE_SSL, MINIO_USER } from "./env";

export const minioClient = new minio.Client({
    endPoint: MINIO_HOST,
    port: 9000,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_USER,
    secretKey: MINIO_PASSWORD,
});

export const minioStorageConfigPaths = {
    temporary:"./images/temporary/",
    final:"./images/final/",
    errors:"./errors/"
}

export const bucketName = "ciringas-images-toolkit";

export const minioReady = (async () => {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
        await minioClient.makeBucket(bucketName, "us-east-1");
    }
})();

export async function uploadImage(
    objectName: string,
    filePath: string,
    contentType = "application/octet-stream",
) {
    await minioReady;
    const fileStats = await stat(filePath);
    await minioClient.putObject(
        bucketName,
        objectName,
        createReadStream(filePath),
        fileStats.size,
        { "Content-Type": contentType },
    );
    return objectName;
}

export async function getImage(objectName: string) {
    await minioReady;
    return minioClient.getObject(bucketName, objectName);
}


