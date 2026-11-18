// Path: packages/etl-pipeline/src/vectorizer.ts

import { SpatialCase, MaterialSKU } from '@aetherspace/core-types';

export interface VectorizedRecord {
  id: string;
  values: number[]; // 模拟 384 维向量 (兼容 Workers AI bge-small 模型)
  metadata: {
    title: string;
    category: string;
    style: string;
    country: string;
    unitCostIdr: number;
  };
}

export class SpatialETLPipeline {
  /**
   * 将原始空间案例清洗并转换为可存入 Cloudflare Vectorize 的高维向量格式
   */
  public static transformCaseToVector(spatialCase: SpatialCase): VectorizedRecord {
    // 拼接语义文本：例如 "PIK 2 Tropical Modern Courtyard Villa located in Indonesia with style Tropical Modern and unit cost 8200000 IDR"
    const semanticText = `${spatialCase.title} located in ${spatialCase.country} with style ${spatialCase.style} under category ${spatialCase.category} (${spatialCase.subtype}), unit cost ${spatialCase.unitCostIdr} IDR.`;

    // 模拟调用 Embedding 模型生成的 384 维浮点向量 (生产环境中对接 Cloudflare Workers AI bindings)
    const mockEmbeddingVector = Array.from({ length: 384 }, () => parseFloat((Math.random() * 2 - 1).toFixed(4)));

    return {
      id: spatialCase.id,
      values: mockEmbeddingVector,
      metadata: {
        title: spatialCase.title,
        category: spatialCase.category,
        style: spatialCase.style,
        country: spatialCase.country,
        unitCostIdr: spatialCase.unitCostIdr,
      },
    };
  }

  /**
   * 批量处理输入案例库
   */
  public static runBatchETL(cases: SpatialCase[]): {
    vectorUpserts: VectorizedRecord[];
    sqlInsertStatements: string[];
  } {
    const vectorUpserts: VectorizedRecord[] = [];
    const sqlInsertStatements: string[] = [];

    for (const item of cases) {
      // 1. 生成向量记录
      const vectorized = this.transformCaseToVector(item);
      vectorUpserts.push(vectorized);

      // 2. 生成 D1 数据库 SQL 插入语句
      const sql = `INSERT INTO spatial_cases (id, title, category, subtype, style, area_sqm, country, image_url, unit_cost_idr) VALUES ('${item.id}', '${item.title.replace(/'/g, "''")}', '${item.category}', '${item.subtype}', '${item.style}', ${item.areaSqm}, '${item.country}', '${item.imageUrl}', ${item.unitCostIdr});`;
      sqlInsertStatements.push(sql);
    }

    console.log(`[ETL Pipeline] Successfully processed ${cases.length} spatial cases into vector & SQL format.`);
    return { vectorUpserts, sqlInsertStatements };
  }
}
