export class createKampRequestDTO {
  naam: string;
  locatie: string;
  startDatum: Date;
  eindDatum: Date;
}
export class KampResponseDto extends createKampRequestDTO {
  id: number;
}

export class KampenListResponseDto {
  items: KampResponseDto[];
}
