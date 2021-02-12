<div align="center">
<h1>Track my trainings</h1>

<p>Create and received track and fields trainings</p>

<br />

</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [About The Project](#about-the-project)
- [The models](#the-models)
  - [Team](#team)
  - [Group](#group)
  - [User](#user)
  - [Athlete](#athlete)
  - [GroupAthlete](#group-athlete)
  - [Coach](#coach)
  - [GroupCoach](#group-coach)
  - [Facility](#facility)
  - [Training](#training)
  - [Jump, Race, Throw, Weigth](#events)
  - [Discipline](#discipline)
  - [TrainingDiscipline](#training-discipline)
- [Improvements](#improvements)
- [Install](#installation)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About The Project

As a volonteer track and field coach and with the countless lockdowns, curfews etc. that we're dealing right now. I thought it might be helpful for my athletes to have all their workouts in one place instead of sending every session on the group chat.

## The Models

### Team


### Group

Belong to a team.

### User


### Athlete

For simplicity every User has an Athlete (If you have a body you are an athlete...)

### GroupAthlete
Join table between a group and an athlete

### Coach

Some users have a coach association

### GroupCoach

Join table between a group and a coach

### Facility

Place where a training sessions is done

### Training

Polymorphic model. A training can have 2 types:

- Athlete. Training that are created for one athlete only. It can be created by the athlete itself or a coach
- Group. Training created for a group only. All the athletes(group_athletes) will receive it.

On the front side. 3 types of training are possible. But there are only 2 types:
As a athlete:

- Personal training: Training that are created for one athlete only. It can be created by the athlete itself or a coach (Type: Athlete)

As a coach:

- Special training: Training that will be created for some athletes (Type: Athlete)
- Group. Training created for a group only. All the athletes(group_athletes) will receive it (Type: Group)

### Jump, Race, Throw, Weigth

Workouts Events

### Discipline

Polymorphic model. Model that link all the "Workouts Events together

### TrainingDiscipline

Join table between a Training and a Discipline. A training can have 0 or more training_disciplines


## Improvements

- add an admin model/ dashboard
- notification model to persist the notification until it's open 
- Track the result/performance by training discipline of an athlete
- etc..

## Install
run

```
bundle
```

then
```
rails db:create db:migrate db:seed
```

and finally
```
rake start 
```
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

or just use these crendentials on this address:  
https://trackmytrainings.herokuapp.com/

As a coach

```
email: zizou@trackmytrainings.com 
password: password
```

As an athlete 

```
email: johndoe@trackmytrainings.com 
password: password
```

## LICENSE

[MIT](LICENSE)