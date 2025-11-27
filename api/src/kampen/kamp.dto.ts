export class createKampRequestDTO {
  naam: string;
  stad: string;
  beschrijving: string;
  startDatum: Date;
  eindDatum: Date;
}

export class KampResponseDto extends createKampRequestDTO {
  id: number;
}

export class KampenListResponseDto {
  items: KampResponseDto[];
}
