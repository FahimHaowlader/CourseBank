import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    courseCode: {
      type: String,
      required: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      lowercase: true,
    },
    startingDate: {
      type: Date,
      required: true,
      set: (value) => new Date(value),
    },
    degree: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["bachelors", "masters", "phd"],
    },

    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: [1, "Semester must be at least 1est year 1est semester"],
      max: [62, "Semester cannot exceed 6th year 2nd semester"],
    },
    description: {
      type: String,
      required: true,
      select: false,
    },
    credits: {
      type: Number,
      required: true,
      min: [1, "Credits cannot be negative"],
      max: [10, "Credits cannot exceed 10"],
    },

    format: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["major", "non-major", "elective"],
    },
    hscYear: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["core", "lab", "project"],
    },
    instructorName: {
      type: String,
      required: true,
      lowercase: true,
    },
    instructorDepartment: {
      type: String,
      required: true,
      lowercase: true,
      select: false,
    },
    // instructorImage: {
    //   imageURL: {
    //     type: String,
    //     required: [true, "Instructor image URL is required"],
    //     // Simplified validation: just check if it's a valid URL format
    //     validate: {
    //       validator: function (v) {
    //         return /^(https?:\/\/)/i.test(v);
    //       },
    //       message: "Invalid image URL format",
    //     },
    //   },
    //   publicId: {
    //     type: String,
    //     required: [true, "Public ID is required for image management"],
    //     select: false,
    //   },
    // },

    books: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          id: {
            type: Number,
            required: true,
          },
          authorName: {
            // Add this field
            type: String,
            required: [true, "Book author name is required"],
          },
          fileUrl: {
            type: String,
            required: [true, "Book URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message: "The URL must be a valid PDF document link for books",
            },
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for book management"],
          //   select: false,
          // },
        },
      ],
      select: false,
      // required: [true, 'At least one book URL is required']
    },
    materials: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          id: {
            type: Number,
            required: true,
          },
          fileUrl: {
            type: String,
            required: [true, "Material URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for materials",
            },
          },

          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for material management"],
          //   select: false,
          // },
        },
      ],
      select: false,

      // required: [true, 'At least one material URL is required']
    },
    tasks: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          id: {
            type: Number,
            required: true,
          },
          fileUrl: {
            type: String,
            required: [true, "Task URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message: "The URL must be a valid PDF document link for tasks",
            },
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for task management"],
          //   select: false,
          // },
        },
      ],
      select: false,
      // required: [true, 'At least one task is required']
    },
    assessments: {
      type: [
        {
          type: {
            type: String,
            required: true,
            enum: [
              "midterm-1",
              "midterm-2",
              "midterm-3",
              "termtest-1",
              "termtest-2",
              "termtest-3",
              "quiz-1",
              "quiz-2",
              "final",
              "project",
            ],
          },
          id: {
            type: Number,
            required: true,
          },
          mark: {
            type: Number,
            required: true,
            min: [0, "Marks cannot be negative"],
            max: [100, "Marks cannot exceed 100"],
          },
          fileUrl: {
            type: String,
            required: [true, "Assessment URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for assessments",
            },
          },
          date: {
            type: Date,
            required: true,
            set: (value) => new Date(value),
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for assesment management"],
          //   select: false,
          // },
        },
      ],
      select: false,
      // required: [true, 'At least one assesment is required']
    },
    handbook: {
  type: String,
  validate: {
    validator: function (v) {
      // 1. Ensure it starts with http/https
      // 2. Ensure it contains "google.com"
      // 3. Ensure no spaces
      const isGoogle = v.includes("google.com");
      const isValidUrl = /^(https?:\/\/)[^\s]+$/i.test(v);
      
      return isGoogle && isValidUrl;
    },
    message: props => `${props.value} is not a valid Google Drive link for the handbook!`,
  },
},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },

    status: {
      type: String,
      enum: ["draft", "pending", "approved",],
      default: "draft",
    },

    submittedAt: {
      type: Date,
      set: (value) => new Date(value),
      select: false,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    feedback: {
      type: String,
      trim: true,
    },
    isEditedSinceFeedback: {
      type: Boolean,
      default: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);




/**
 * REFACTORED ASYNC PRE-SAVE MIDDLEWARE
 * (No 'next' argument = no 'next is not a function' error)
 */
courseSchema.pre('save', async function () {
  // 1. Allow if it's a new document
  if (this.isNew) {
    return; // Returning simply moves to the next middleware
  }

  // 2. Allow if the internal admin flag is set
  // We check both the virtual and the internal property
  if (this.isAdminRequest === true || this._isAdminRequest === true) {
    return;
  }

  // 3. Check for the 1-year lock
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  const currentTime = Date.now();
  
  // Ensure we have a valid creation date from timestamps
  const creationTime = this.createdAt ? new Date(this.createdAt).getTime() : currentTime;

  if (currentTime - creationTime > oneYearInMs) {
    const error = new Error("This course is over 1 year old and is locked. Only admins can modify archived records.");
    error.name = "ValidationError"; 
    // In async middleware, THROWING the error replaces next(error)
    throw error; 
  }
});
const Course = mongoose.model("Course", courseSchema);

export default Course;
