

export class VerifyOtpDto {
  public userName: string;
  public otp: string;
  public reqType: "forgot" | "request";
}
