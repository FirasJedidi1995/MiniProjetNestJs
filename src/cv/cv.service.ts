import { Injectable, NotFoundException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async findCvById(id: number) {
    const cv = await this.cvRepository.findOne({ where: { id: id } });
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return cv;
  }
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }
  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    //on recupére le cv d'id id et ensuite on remplace les anciennes
    //valeurs par ceux du cv passé en paramétre
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    if (!newCv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas `);
    }
    //sauvegarder la nouvelle entité donc le nouveau cv
    return await this.cvRepository.save(newCv);
  }
  updateCv2(updateCriteria, cv: UpdateCvDto) {
    return this.cvRepository.update(updateCriteria, cv);
  }

  async removeCv(id: number) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.remove(cvToRemove);
  }

  /*async softRemoveCv(id: number) {
    const cvToRemoveSoft = await this.findCvById(id);
    return this.cvRepository.softRemove(cvToRemoveSoft);
  }*/

  async softDelete(id: number) {
    return await this.cvRepository.softDelete(id);
  }
  async deleteCv(id: number) {
    return await this.cvRepository.delete(id);
  }
  async restoreCv(id: number) {
    return await this.cvRepository.restore(id);
  }
  async statCvNumberByAge(maxAge, minAge = 0) {
    //creer un QueryBuilder
    const qb = this.cvRepository.createQueryBuilder('cv');
    //chercher le nombre de cv par age
    qb.select('cv.age , count(cv.id) as nombreDeCv')
      .groupBy('cv.age')
      .where('cv.age> :ageMin and cv.age< :ageMax ')
      .setParameters({ ageMin: minAge, ageMax: maxAge });
    console.log(qb.getSql());
    return qb.getRawMany();
  }
}
