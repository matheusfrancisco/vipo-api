/**
 * This is the base MailOptions type. All types present in all templates should go here.
 * Options present in all templates should go as NonNullable. Options present on only one or more templates should go as optional
 */
interface IMailOptions {
  template: string;
  to: string;
  resetPasswordLink?: string;
}

/**
 * By extending the default MailOptions, we can specify what options are really present on which templates.
 * The template option here must always be a constant to allow Typescript to identify which option type we are passing as an argument
 */
interface IResetPasswordMailOptions extends IMailOptions {
  template: "reset-password";
  resetPasswordLink: string;
}

/**
 * This is the union type informing that the options on sendMail are all different mutations of a generic object. By using this structure,
 * Typescript can ensure that a certain template receives all the options it should and no other options.
 */
export type ISendMailOptions = IResetPasswordMailOptions;

export default interface IMailProvider {
  sendMail(options: ISendMailOptions): Promise<void>;
}
